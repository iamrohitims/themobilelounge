import { jsonRepo } from "./json-repo";
import { firebaseRepo } from "./firebase-repo";
import { IDataRepository } from "./interface";

const useFirebase = process.env.NEXT_PUBLIC_DATA_SOURCE === "firebase";

export const dataRepo: IDataRepository = useFirebase ? firebaseRepo : jsonRepo;

export * from "./interface";
