/* The only file that talks to Bloom.

   In the prototype it hands out the STAND-IN doorway. When the real
   doorway exists (docs/world/09-plug-in-contract.md), swapping it in is a
   change to the one import line below, and nothing else in the world
   needs to know. */
import { BloomDoor } from "./standin-bloom.js";

const SUPPORTED = 1;
if(BloomDoor.version !== SUPPORTED){
  throw new Error("This world needs doorway version " + SUPPORTED + ".");
}
export const door = BloomDoor;
