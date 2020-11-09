import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

import { residentsColl } from '../firestore';
import { joinStringsAsList } from '../util';

interface AccountWithResidents {
  accountID: string;
  telephone: string;
  residents: string[];
}

interface AccountListing {
  accountID: string;
  telephone: string;
  name: string;
}

const listResFamAccounts = async (
  _: any,
  context: https.CallableContext,
): Promise<AccountListing[]> => {
  // assertIsAdmin(context);
  const { users } = await admin.auth().listUsers();
  const accounts = users
    .filter(
      (u) => u.email !== undefined && /^\d{10}@example\.com$/.test(u.email),
    )
    .map<AccountWithResidents>((u) => ({
      accountID: u.uid,
      telephone: u.email?.split('@example.com')[0] || '',
      residents: [],
    }));
  const { docs } = await residentsColl.get();
  docs.forEach((doc) => {
    const { firstName, lastName, accountID } = doc.data();
    const residentName = `${firstName} ${lastName}`;
    accounts
      .find((a) => a.accountID === accountID)
      ?.residents.push(residentName);
  });
  return accounts.map(({ accountID, telephone, residents }) => {
    return {
      accountID,
      telephone,
      name: joinStringsAsList(residents) || 'Sin residentes',
    };
  });
};

export default listResFamAccounts;
