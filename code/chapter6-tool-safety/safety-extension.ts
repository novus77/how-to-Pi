import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const dangerousPatterns = [
  /\brm\s+-rf\b/,
  /\bgit\s+push\b.*\s--force\b/,
  /\bcurl\b.*\|\s*(sh|bash)\b/,
  /\bchmod\s+-R\s+777\b/,
];

function isDangerousCommand(command: string): boolean {
  return dangerousPatterns.some((pattern) => pattern.test(command));
}

export default function (pi: ExtensionAPI) {
  pi.on("tool_call", async (event, ctx) => {
    if (event.toolName !== "bash") return;

    const command = String(event.input?.command ?? "");
    if (!isDangerousCommand(command)) return;

    const reason = `Blocked dangerous bash command: ${command}`;

    if (!ctx.hasUI) {
      return { block: true, reason };
    }

    const ok = await ctx.ui.confirm("Dangerous command", `${command}\n\nAllow this command?`);
    if (!ok) {
      return { block: true, reason };
    }
  });

  pi.registerCommand("safety-status", {
    description: "Show active safety rules",
    handler: async (_args, ctx) => {
      ctx.ui.notify(`Safety extension active with ${dangerousPatterns.length} command guards.`, "info");
    },
  });
}
