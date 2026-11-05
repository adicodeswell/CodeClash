// Serializes JavaScript inputs and outputs into CodeClash whitespace-separated text files
// conforming to the problem's Structure.md specifications.

export function formatInput(spec, values) {
  const lines = [];

  for (const field of spec.inputs) {
    const val = Array.isArray(values)
      ? values[spec.inputs.indexOf(field)]
      : values[field.name];

    if (val === undefined || val === null) {
      throw new Error(`Missing value for input field "${field.name}"`);
    }

    if (field.type === "int" || field.type === "long") {
      lines.push(String(val));
    } else if (field.type === "double") {
      lines.push(String(val));
    } else if (field.type === "list<int>" || field.type === "list<long>") {
      if (!Array.isArray(val)) {
        throw new Error(`Field "${field.name}" expected an array, got ${typeof val}`);
      }
      lines.push(String(val.length));
      if (val.length > 0) {
        lines.push(val.join(" "));
      }
    } else if (field.type === "list<String>") {
      if (!Array.isArray(val)) {
        throw new Error(`Field "${field.name}" expected an array, got ${typeof val}`);
      }
      lines.push(String(val.length));
      if (val.length > 0) {
        lines.push(val.join(" "));
      }
    } else if (field.type === "list<list<int>>") {
      if (!Array.isArray(val)) {
        throw new Error(`Field "${field.name}" expected a 2D array, got ${typeof val}`);
      }
      lines.push(String(val.length));
      for (const row of val) {
        lines.push(String(row.length));
        if (row.length > 0) {
          lines.push(row.join(" "));
        }
      }
    } else if (field.type === "list<list<String>>") {
      if (!Array.isArray(val)) {
        throw new Error(`Field "${field.name}" expected a 2D array, got ${typeof val}`);
      }
      lines.push(String(val.length));
      for (const row of val) {
        lines.push(String(row.length));
        if (row.length > 0) {
          lines.push(row.join(" "));
        }
      }
    } else if (field.type === "bool") {
      lines.push(val ? "1" : "0");
    } else if (field.type === "String") {
      lines.push(String(val));
    } else {
      throw new Error(`Unsupported field type for formatting: "${field.type}"`);
    }
  }

  return lines.join("\n");
}

export function formatOutput(spec, value) {
  if (value === undefined || value === null) {
    throw new Error("Output value cannot be null or undefined");
  }

  if (spec.output.type === "int" || spec.output.type === "long") {
    return String(value);
  }

  if (spec.output.type === "double") {
    return String(value);
  }

  if (spec.output.type === "list<int>" || spec.output.type === "list<long>") {
    if (!Array.isArray(value)) {
      throw new Error(`Expected array output for ${spec.output.type}, got ${typeof value}`);
    }
    return value.join(" ");
  }

  if (spec.output.type === "list<String>") {
    if (!Array.isArray(value)) {
      throw new Error(`Expected array output for ${spec.output.type}, got ${typeof value}`);
    }
    return value.join(" ");
  }

  if (spec.output.type === "list<list<int>>" || spec.output.type === "list<list<String>>") {
    if (!Array.isArray(value)) {
      throw new Error(`Expected 2D array output for ${spec.output.type}, got ${typeof value}`);
    }
    return value.map((row) => (Array.isArray(row) ? row.join(" ") : String(row))).join("\n");
  }

  if (spec.output.type === "bool") {
    return value ? "1" : "0";
  }

  if (spec.output.type === "String") {
    return String(value);
  }

  throw new Error(`Unsupported output type for formatting: "${spec.output.type}"`);
}

export function parseInput(spec, rawText) {
  const tokens = rawText.trim().split(/\s+/);
  let cursor = 0;
  const result = [];

  for (const field of spec.inputs) {
    if (field.type === "int" || field.type === "long") {
      if (cursor >= tokens.length) throw new Error(`Missing value for ${field.name}`);
      result.push(Number(tokens[cursor++]));
    } else if (field.type === "double") {
      if (cursor >= tokens.length) throw new Error(`Missing value for ${field.name}`);
      result.push(Number(tokens[cursor++]));
    } else if (field.type === "list<int>" || field.type === "list<long>") {
      if (cursor >= tokens.length) throw new Error(`Missing length for ${field.name}`);
      const len = Number(tokens[cursor++]);
      const arr = [];
      for (let i = 0; i < len; i++) {
        if (cursor >= tokens.length) throw new Error(`Missing element ${i} for ${field.name}`);
        arr.push(Number(tokens[cursor++]));
      }
      result.push(arr);
    } else if (field.type === "list<String>") {
      if (cursor >= tokens.length) throw new Error(`Missing length for ${field.name}`);
      const len = Number(tokens[cursor++]);
      const arr = [];
      for (let i = 0; i < len; i++) {
        if (cursor >= tokens.length) throw new Error(`Missing element ${i} for ${field.name}`);
        arr.push(tokens[cursor++]);
      }
      result.push(arr);
    } else if (field.type === "list<list<int>>") {
      if (cursor >= tokens.length) throw new Error(`Missing row count for ${field.name}`);
      const r = Number(tokens[cursor++]);
      const mat = [];
      for (let i = 0; i < r; i++) {
        if (cursor >= tokens.length) throw new Error(`Missing col count for row ${i} of ${field.name}`);
        const c = Number(tokens[cursor++]);
        const row = [];
        for (let j = 0; j < c; j++) {
          if (cursor >= tokens.length) throw new Error(`Missing cell [${i}][${j}] of ${field.name}`);
          row.push(Number(tokens[cursor++]));
        }
        mat.push(row);
      }
      result.push(mat);
    } else if (field.type === "list<list<String>>") {
      if (cursor >= tokens.length) throw new Error(`Missing row count for ${field.name}`);
      const r = Number(tokens[cursor++]);
      const mat = [];
      for (let i = 0; i < r; i++) {
        if (cursor >= tokens.length) throw new Error(`Missing col count for row ${i} of ${field.name}`);
        const c = Number(tokens[cursor++]);
        const row = [];
        for (let j = 0; j < c; j++) {
          if (cursor >= tokens.length) throw new Error(`Missing cell [${i}][${j}] of ${field.name}`);
          row.push(tokens[cursor++]);
        }
        mat.push(row);
      }
      result.push(mat);
    } else if (field.type === "bool") {
      result.push(tokens[cursor++] === "1");
    } else if (field.type === "String") {
      result.push(tokens[cursor++]);
    }
  }

  return result;
}
