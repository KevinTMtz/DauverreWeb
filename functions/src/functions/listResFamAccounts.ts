import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

// import * as assert from '../assert';
import { getResidentsColl } from '../firestore';

interface AccountListing {
  accountID: string;
  telephone: string;
  residents: {
    residentID: string;
    name: string;
  }[];
}

const listResFamAccounts = async (
  _: any,
  context: https.CallableContext,
): Promise<AccountListing[]> => {
  // assert.isAdmin(context);
  const { users } = await admin.auth().listUsers();
  const accounts = users
    .filter(
      (u) => u.email !== undefined && /^\d{10}@example\.com$/.test(u.email),
    )
    .map<AccountListing>((u) => ({
      accountID: u.uid,
      telephone: u.email?.split('@example.com')[0] || '',
      residents: [],
    }));
  const { docs } = await getResidentsColl().get();
  docs.forEach((doc) => {
    const { accountID, firstName, lastName } = doc.data();
    const name = `${firstName} ${lastName}`;
    accounts
      .find((a) => a.accountID === accountID)
      ?.residents.push({ residentID: doc.id, name });
  });
  return accounts;
};

export default listResFamAccounts;
