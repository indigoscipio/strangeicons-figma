figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === "insert-icon") {
    const svgNode = figma.createNodeFromSvg(msg.svg);
    figma.currentPage.appendChild(svgNode);
    figma.viewport.scrollAndZoomIntoView([svgNode]);
  }

  if (msg.type === "cancel") {
    figma.closePlugin();
  }
};
