import { readFile } from "fs/promises";

const solveFirst = async () => {
  const data = await readFile("day-7/input.txt", "utf-8");
  const rules = data.split("\r\n").map((ruleString) => new Rule(ruleString));

  const ancestors = findParents("shiny gold", rules);

  console.log("7A. Bag colors shiny gold bag can be inside", ancestors.length);
};
const solveSecond = async () => {
  const data = await readFile("day-7/input.txt", "utf-8");
  const rules = data.split("\r\n").map((ruleString) => new Rule(ruleString));

  const bagsInBag = numberOfBagsInBag("shiny gold", rules);

  console.log("7B. Individual bag required inside shiny gold bag", bagsInBag);
};

const findParents = (color: string, rules: Rule[]): string[] => {
  const directParents = rules.filter((r) =>
    r.Contents.some((c) => c.Color === color)
  );
  const ancestors = directParents.flatMap((p) => findParents(p.Color, rules));
  return Array.from(
    new Set<string>([...directParents.map((p) => p.Color), ...ancestors])
  );
};

const numberOfBagsInBag = (
  color: string,
  rules: Rule[],
  level: number = 1
): number => {
  const logLevel = 2;
  const levelSpacing = Array(level).join("  ");
  if (level <= logLevel) console.log(levelSpacing, color, "being processed");
  const ruleForColor = rules.find((r) => r.Color === color);
  if (!ruleForColor) throw new Error("Could not find rule for color");
  if (!ruleForColor.Contents.length) {
    if (level <= logLevel)
      console.log(levelSpacing, "Bag contains no other bags");
    return 0;
  }
  const childBagCount = ruleForColor.Contents.reduce((count, child) => {
    const childBagChildCount = numberOfBagsInBag(child.Color, rules, level + 1);
    const total = child.Count * (1 + childBagChildCount);
    return total + count;
  }, 0);
  if (level <= logLevel)
    console.log(levelSpacing, color, "contains", childBagCount);
  return childBagCount;
};

class Rule {
  Color: string;
  Contents: RuleContent[];

  constructor(row: string) {
    const rowParts = row.match(/^(.*) bags contain (.*)\.$/);
    if (!rowParts) throw new Error("Could not parse row");
    this.Color = rowParts[1];
    const contents = rowParts[2].split(", ");
    this.Contents = contents
      .map<RuleContent | undefined>(
        (contentString: string): RuleContent | undefined => {
          const contentParts = contentString.match(/^(\d+) (.*) bags?$/);
          if (!contentParts) return undefined;
          return {
            Count: Number.parseInt(contentParts[1]),
            Color: contentParts[2],
          };
        }
      )
      .reduce<RuleContent[]>((agg, curr) => (curr ? [curr, ...agg] : agg), []);
  }
}

type RuleContent = {
  Color: string;
  Count: number;
};

export default {
  solveFirst,
  solveSecond,
};
