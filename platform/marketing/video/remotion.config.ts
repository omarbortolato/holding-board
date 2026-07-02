import { Config } from "@remotion/cli/config";

// Server con poca RAM libera: teniamo la concorrenza bassa per non far
// competere il rendering con gli agenti in produzione sullo stesso host.
Config.setConcurrency(1);
Config.setPublicDir("assets");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
