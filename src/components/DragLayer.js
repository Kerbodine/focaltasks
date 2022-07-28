import React, { useEffect, useState } from "react";
import { useDragLayer } from "react-dnd";
import TaskDragPreview from "./TaskDragPreview";

export default function DragLayer() {
  function getItemStyles(initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset) {
      return {
        display: "none",
      };
    }
    let { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
      transform,
      WebkitTransform: transform,
    };
  }

  const { itemType, isDragging, initialOffset, currentOffset, item } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  if (!isDragging) {
    return null;
  }

  function renderItem() {
    switch (itemType) {
      case "task":
        return (
          <TaskDragPreview title={item.title} completed={item.completed} />
        );
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div className="drag-layer">
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
}
