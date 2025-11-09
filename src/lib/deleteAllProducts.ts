/**
 * DELETE ALL PRODUCTS - Clean slate
 */

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export async function deleteAllProducts() {
  console.log('🗑️ DELETING ALL PRODUCTS...');
  
  try {
    const productsSnap = await getDocs(collection(db, 'products'));
    
    for (const docSnap of productsSnap.docs) {
      await deleteDoc(doc(db, 'products', docSnap.id));
      console.log(`✅ Deleted: ${docSnap.data().name}`);
    }
    
    console.log(`\n✅ DELETED ${productsSnap.size} PRODUCTS`);
    
    return { success: true, deleted: productsSnap.size };
    
  } catch (error) {
    console.error('❌ Delete failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
