figma.showUI(__html__, { width: 360, height: 520 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "insert-icon") {
    const node = figma.createNodeFromSvg(msg.svg);
    const center = figma.viewport.center;
    node.x = center.x - node.width / 2;
    node.y = center.y - node.height / 2;
    figma.currentPage.appendChild(node);
    figma.viewport.scrollAndZoomIntoView([node]);
  }

  if (msg.type === "cancel") {
    figma.closePlugin();
  }
};
