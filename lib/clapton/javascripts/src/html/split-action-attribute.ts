export const splitActionAttribute = (action: string) => {
  const match = action.match(/^(.+)->(.+)#(.+)@(\d+)$/);
  const componentName = match?.[2].replace("State", "Component");
  if (!match) return { eventType: "", componentName: "", stateName: "", fnName: "", bounceTime: 0 };
  return { eventType: match[1], componentName: componentName, stateName: match[2], fnName: match[3], bounceTime: parseInt(match[4] || "0") };
};
