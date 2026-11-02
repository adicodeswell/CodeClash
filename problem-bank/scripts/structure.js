import fs from "node:fs/promises";

const supportedTypes = new Set([
  "int", "long", "double", "bool", "String",
  "list<int>", "list<long>", "list<double>",
  "list<bool>", "list<String>",
  "list<list<int>>", "list<list<long>>",
  "list<list<double>>", "list<list<bool>>",
  "list<list<String>>"
]);

export async function readStructure(filePath) {
  const text = await fs.readFile(filePath, "utf8");
  const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);

  const valueAfter = (prefix) => {
    const line = lines.find(line => line.startsWith(prefix));
    return line?.slice(prefix.length).trim();
  };

  const problemName = valueAfter("Problem Name:");
  const functionName = valueAfter("Function Name:");
  const inputStart = lines.indexOf("Input Structure:");
  const outputStart = lines.indexOf("Output Structure:");

  if (!problemName || !functionName || inputStart < 0 || outputStart < 0) {
    throw new Error("Structure.md must define Problem Name, Function Name, Input Structure, and Output Structure.");
  }

  const inputLines = lines.slice(inputStart + 1, outputStart)
    .filter(line => line.startsWith("Input Field:"));
  const outputLine = lines.slice(outputStart + 1)
    .find(line => line.startsWith("Output Field:"));

  const parseField = (line, prefix) => {
    const match = line.slice(prefix.length).trim().match(/^(.+?)\s+([A-Za-z_][A-Za-z0-9_]*)$/);
    if (!match) throw new Error(`Invalid field declaration: ${line}`);
    const [, type, name] = match;
    if (!supportedTypes.has(type)) throw new Error(`Unsupported type "${type}" for field "${name}".`);
    return { type, name };
  };

  const inputs = inputLines.map(line => parseField(line, "Input Field:"));
  if (inputs.length === 0) throw new Error("Declare at least one Input Field.");
  if (!outputLine) throw new Error("Declare one Output Field.");
  const output = parseField(outputLine, "Output Field:");

  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(functionName)) {
    throw new Error("Function Name must be a valid identifier.");
  }
  if (new Set(inputs.map(field => field.name)).size !== inputs.length) {
    throw new Error("Input field names must be unique.");
  }

  return { problemName: problemName.replace(/^["']|["']$/g, ""), functionName, inputs, output };
}