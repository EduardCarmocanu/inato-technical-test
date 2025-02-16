import { program } from "commander";
import { trialsController } from "./trials/controllers/trials.controller";

const trials = trialsController();

program
  .name("inato-cli")
  .command("trials")
  .description("get the list of clinical trials")
  .addOption(trials.getTrialsCountryOptions())
  .action(trials.streamOngoingTrials)
  .parseAsync(process.argv);
