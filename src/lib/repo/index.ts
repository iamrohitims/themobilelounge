import { jsonRepo } from "./json-repo";
import { firebaseRepo } from "./firebase-repo";
import { payloadRepo } from "./payload-repo";
import { IDataRepository } from "./interface";

// Default to payloadRepo so the live MongoDB Atlas database is always used
const source = process.env.NEXT_PUBLIC_DATA_SOURCE;

export const dataRepo: IDataRepository =
  source === "json"
    ? jsonRepo
    : source === "firebase"
    ? firebaseRepo
    : payloadRepo;

export * from "./interface";
export { getDynamicReels, getDetailedReels, getHotDeals } from "./payload-repo";
