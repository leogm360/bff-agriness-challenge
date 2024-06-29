import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [RuleConfigSeverity.Error, "always", 80],
    "body-max-length": [RuleConfigSeverity.Error, "always", 80],
    "footer-max-length": [RuleConfigSeverity.Error, "always", 80],
  },
};

export default Configuration;
