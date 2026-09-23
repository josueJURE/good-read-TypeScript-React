// @ts-check
import { module } from "@prisma/composer";
import goodReadService from "./service.mjs";

export default module("deep-violet-dinosaur", ({ provision }) => {
  provision(goodReadService, { id: "goodread" });
});
