figma.showUI(__html__, { width: 360, height: 520 });

function positionAtViewportCenter(node: SceneNode) {
  const center = figma.viewport.center;
  node.x = center.x - node.width / 2;
  node.y = center.y - node.height / 2;
}

figma.ui.onmessage = (msg) => {
  if (msg.type === "insert-icon") {
    const node = figma.createNodeFromSvg(msg.svg);
    const sel = figma.currentPage.selection;

    if (sel.length > 0) {
      const target = sel[0];
      const parent = target.parent;

      const containerTypes = new Set(["FRAME", "GROUP", "COMPONENT", "INSTANCE", "SECTION"]);

      if (containerTypes.has(target.type)) {
        (target as FrameNode).appendChild(node);
        if ((target as FrameNode).layoutMode === "NONE") {
          node.x = (target as FrameNode).width / 2 - node.width / 2;
          node.y = (target as FrameNode).height / 2 - node.height / 2;
        }
      } else if (parent && parent.type !== "PAGE") {
        const idx = (parent as FrameNode).children.indexOf(target);
        (parent as FrameNode).insertChild(idx + 1, node);
        node.x = target.x;
        node.y = target.y + target.height + 20;
      } else {
        figma.currentPage.appendChild(node);
        positionAtViewportCenter(node);
      }
    } else {
      figma.currentPage.appendChild(node);
      positionAtViewportCenter(node);
    }

    figma.currentPage.selection = [node];
  }

  if (msg.type === "resize") {
    figma.ui.resize(msg.width, msg.height);
  }

  if (msg.type === "cancel") {
    figma.closePlugin();
  }
};

figma.on("drop", (event) => {
  const item = event.items.find((i) => i.type === "image/svg+xml");
  if (!item) return false;
  const node = figma.createNodeFromSvg(item.data);
  node.x = event.absoluteX - node.width / 2;
  node.y = event.absoluteY - node.height / 2;
  figma.currentPage.appendChild(node);
  figma.currentPage.selection = [node];
  return false;
});


