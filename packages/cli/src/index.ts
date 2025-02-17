import { program } from "commander";
import { trialsController } from "./trials/controllers/trials.controller";
import { optionsController } from "./trials/controllers/options.controller";

program
  .name("inato-cli")
  .command("trials")
  .description("get the list of clinical trials")
  .addOption(optionsController().getTrialsCountryOptions())
  .action(trialsController().streamOngoingTrials)
  .parseAsync(process.argv);
