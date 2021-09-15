import {
	AccountTrackerController,
	AddressBookController,
	AssetsContractController,
	CurrencyRateController,
	KeyringController,
	PersonalMessageManager,
	MessageManager,
	PhishingController,
	PreferencesController,
	Transaction,
	TypedMessageManager,
    TransactionController,
    AccountImportStrategy,
} from '@metamask/controllers';
import Encryptor from './Encryptor';
import { toChecksumAddress } from 'ethereumjs-util';
import { Engine as EngineType } from '../../models/engine/engine';
import { EngineContext } from '../../models/engine/context';
import Logger from '../../utils/Logger';

const encryptor = new Encryptor();

/**
 * Core controller responsible for composing other controllers together
 * and exposing convenience methods for common wallet operations.
 */
class Engine {
	/**
	 * ComposableController reference containing all child controllers
	 */
	datamodel;

    static instance: any;
    context: { 
        KeyringController: KeyringController; 
        TransactionController: TransactionController; 
        PreferencesController: PreferencesController;
        CurrencyRateController: CurrencyRateController;
        AccountTrackerController: AccountTrackerController;
    };

	/**
	 * Creates a CoreController instance
	 */
	constructor(initialState: EngineContext) {
		if (!Engine.instance) {
			const preferencesController = new PreferencesController({},{});
			const assetsContractController = new AssetsContractController();
            

			const controllers = [
				new KeyringController(
					{
						removeIdentity: preferencesController.removeIdentity.bind(preferencesController),
						syncIdentities: preferencesController.syncIdentities.bind(preferencesController),
						updateIdentities: preferencesController.updateIdentities.bind(preferencesController),
						setSelectedAddress: preferencesController.setSelectedAddress.bind(preferencesController)
					},
					{ encryptor },
					initialState.KeyringController
				),
				new AccountTrackerController({
					onPreferencesStateChange: listener => preferencesController.subscribe(listener),
					getIdentities: () => preferencesController.state.identities
				}),
				new AddressBookController(),
				assetsContractController,
				new PersonalMessageManager(),
				new MessageManager(),
				new PhishingController(),
				preferencesController,
				new TypedMessageManager()
			];
			// set initial state
			// TODO: Pass initial state into each controller constructor instead
			// This is being set post-construction for now to ensure it's functionally equivalent with
			// how the `ComponsedController` used to set initial state.
			//
			// The check for `controller.subscribe !== undefined` is to filter out BaseControllerV2
			// controllers. They should be initialized via the constructor instead.
			for (const controller of controllers) {
				if (initialState[controller.name] && controller.subscribe !== undefined) {
					controller.update(initialState[controller.name]);
				}
			}
			this.context = controllers.reduce((context, controller) => {
				context[controller.name] = controller;
				return context;
			}, {} as any);

			const {
				KeyringController: keyring,
				TransactionController: transaction
			} = this.context;

			transaction.configure({ sign: keyring.signTransaction.bind(keyring) });
			Engine.instance = this;
		}
		return Engine.instance;
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	refreshTransactionHistory = async (forceCheck: any) => {
		
	};

	getTotalFiatAccountBalance = () => {
		const {
			CurrencyRateController,
			PreferencesController,
			AccountTrackerController
		} = this.context;
		const { selectedAddress } = PreferencesController.state;
		const { currentCurrency } = CurrencyRateController.state;
		const conversionRate =
			CurrencyRateController.state.conversionRate === null ? 0 : CurrencyRateController.state.conversionRate;
		const { accounts } = AccountTrackerController.state;
		let ustFiat = 0;
        const cryptoFiat = 0;
		const decimalsToShow = (currentCurrency === 'usd' && 2) || undefined;
		if (accounts[selectedAddress]) {
			ustFiat = 0;// ustToFiat() 
		}
		

		const total = cryptoFiat + ustFiat;
		return total;
	};

	/**
	 * Returns true or false whether the user has funds or not
	 */
	hasFunds = () => {
		try {
			const fiatBalance = this.getTotalFiatAccountBalance();

			return fiatBalance > 0;
		} catch (e) {
			Logger.log('Error while getting user funds', e);
		}
	};

	resetState = async () => {
		// Whenever we are gonna start a new wallet
		// either imported or created, we need to
		// get rid of the old data from state
		const {
			TransactionController,
		} = this.context;

		TransactionController.update({
			// internalTransactions: [],
			methodData: {},
			transactions: []
		});
	};

	sync = async ({
		accounts,
		preferences,
		transactions,
		seed,
		pass,
		importedAccounts,
	}) => {
		const {
			KeyringController,
			PreferencesController,
			TransactionController,
		} = this.context;

		// Recreate accounts
		await KeyringController.createNewVaultAndRestore(pass, seed);
		for (let i = 0; i < accounts.hd.length - 1; i++) {
			await KeyringController.addNewAccount();
		}

		// Recreate imported accounts
		if (importedAccounts) {
			for (let i = 0; i < importedAccounts.length; i++) {
				await KeyringController.importAccountWithStrategy(AccountImportStrategy.privateKey, [importedAccounts[i]]);
			}
		}

		// Restore preferences
		const updatedPref = { ...preferences, identities: {} };
		Object.keys(preferences.identities).forEach(address => {
			const checksummedAddress = toChecksumAddress(address);
			if (accounts.hd.includes(checksummedAddress) || accounts.simpleKeyPair.includes(checksummedAddress)) {
				updatedPref.identities[checksummedAddress] = preferences.identities[address];
				updatedPref.identities[checksummedAddress].importTime = Date.now();
			}
		});
		await PreferencesController.update(updatedPref);

		if (accounts.hd.includes(toChecksumAddress(updatedPref.selectedAddress))) {
			PreferencesController.setSelectedAddress(updatedPref.selectedAddress);
		} else {
			PreferencesController.setSelectedAddress(accounts.hd[0]);
		}

		const mapTx = ({
			id,
			metamaskNetworkId,
			origin,
			status,
			time,
			hash,
			rawTx,
			txParams
		}: {
			id: any;
			metamaskNetworkId: string;
			origin: string;
			status: string;
			time: any;
			hash: string;
			rawTx: string;
			txParams: Transaction;
		}) => ({
			id,
			networkID: metamaskNetworkId,
			origin,
			status,
			time,
			transactionHash: hash,
			rawTx,
			transaction: { ...txParams }
		});

		await TransactionController.update({
			transactions: transactions.map(mapTx)
		});

		return true;
	};
}

let instance: Engine;

export default {
	get context() {
		return instance && instance.context;
	},
    
	get state() {
		const {
			AccountTrackerController,
			AddressBookController,
			AssetsContractController,
			AssetsDetectionController,
			CurrencyRateController,
			KeyringController,
			PersonalMessageManager,
			PreferencesController,
			PhishingController,
			TransactionController,
			TypedMessageManager,
		} = instance.datamodel.state;

		// normalize `null` currencyRate to `0`
		// TODO: handle `null` currencyRate by hiding fiat values instead
		const modifiedCurrencyRateControllerState = {
			...CurrencyRateController,
			conversionRate: CurrencyRateController.conversionRate === null ? 0 : CurrencyRateController.conversionRate
		};

		return {
			AccountTrackerController,
			AddressBookController,
			AssetsContractController,
			AssetsDetectionController,
			CurrencyRateController: modifiedCurrencyRateControllerState,
			KeyringController,
			PersonalMessageManager,
			PhishingController,
			PreferencesController,
			TransactionController,
			TypedMessageManager,
		};
	},
	get datamodel() {
		return instance.datamodel;
	},
	getTotalFiatAccountBalance() {
		return instance.getTotalFiatAccountBalance();
	},
	hasFunds() {
		return instance.hasFunds();
	},
	resetState() {
		return instance.resetState();
	},
	sync(data: any) {
		return instance.sync(data);
	},
	refreshTransactionHistory(forceCheck = false) {
		return instance.refreshTransactionHistory(forceCheck);
	},
	init(state: EngineContext | undefined) {
		instance = new Engine(state);
		Object.freeze(instance);
		return instance;
	}
};