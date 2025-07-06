import inquirer from "inquirer";
import { askGPT } from "./openai.js";
import chalk from "chalk";
import ora from "ora";

// this function shows the main menu

export async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: chalk.cyanBright(
        "🚀 Welcome to CodePilot CLI! What would you like to do?"
      ),
      choices: [
        { name: "Ask a question", value: "ask" },
        { name: "Exit", value: "exit" },
      ],
    },
  ]);

  if (action === "ask") {
    const { question } = await inquirer.prompt([
      {
        type: "input",
        name: "question",
        message: chalk.yellow("📝 What would you like to ask?"),
      },
    ]);

    const spinner = ora("💬 Thinking... Asking GPT...").start();
    try {
      const answer = await askGPT(question);
      spinner.succeed("✅ Got the unswer!");

      console.log(chalk.greenBright("Your question:"));
      console.log(chalk.whiteBright(question));
      console.log("\n");
      console.log(chalk.greenBright("AI's answer:"));
      console.log(chalk.whiteBright(answer));
    } catch (error) {
      spinner.fail("❌ Failed to get an answer. Please try again.");
      console.error(chalk.redBright("Error: "), error);
    }

    await mainMenu(); // return to main menu after answering
  } else {
    console.log(
      chalk.magentaBright("Thank you for using CodePilot CLI!👋 Goodbye!")
    );
    process.exit(0);
  }
}
