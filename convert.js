const PLAY = 'play';
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("hen.json", "utf-8"));
fs.writeFileSync("nft.json", JSON.stringify([
	[data[PLAY], (() => {
		delete data[PLAY];
		return PLAY;
	})()],
	...Object.entries(data).map(([name, address]) => [address, name])
], null, 2));