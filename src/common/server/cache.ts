import NodeCache from "node-cache";

export const Cache = new NodeCache({ stdTTL: 60 * 60 * 24 });
