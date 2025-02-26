const handleSelect = (e) => {
  const id = Number(e.target.value);
  setSelectedId(id);

  const filteredSteps = stepsData.filter((step) => step.id === id && step.env === selectedEnv);

  if (selectedView === "Nodes") {
    const nodeMap = new Map();
    let yOffset = 0; // Track Y position per level
    const levelMap = new Map(); // Track nodes per level

    // Create nodes
    const newNodes = filteredSteps.map((step) => {
      const parentStep = filteredSteps.find((s) => s.steponsuccess === step.stepid || s.steponfailure === step.stepid);
      const level = parentStep ? (levelMap.get(parentStep.stepid) || 0) + 1 : 0;

      // Adjust position based on level and prevent overlap
      const xPosition = (levelMap.get(level) || 0) * 200;
      const yPosition = level * 150;

      levelMap.set(level, (levelMap.get(level) || 0) + 1);
      levelMap.set(step.stepid, level);

      const node = {
        id: step.stepid.toString(),
        type: "custom",
        data: { label: step.stepfunction, description: step.description },
        position: { x: xPosition, y: yPosition },
      };
      nodeMap.set(step.stepid, node);
      return node;
    });

    // Create edges
    const newEdges = filteredSteps.flatMap((step) => [
      step.steponsuccess !== null
        ? { id: `s-${step.stepid}`, source: step.stepid.toString(), target: step.steponsuccess.toString(), animated: true, style: { stroke: "green" } }
        : null,
      step.steponfailure !== null
        ? { id: `f-${step.stepid}`, source: step.stepid.toString(), target: step.steponfailure.toString(), animated: true, style: { stroke: "red" } }
        : null,
    ]).filter(Boolean);

    setNodes(newNodes);
    setEdges(newEdges);
  }
};