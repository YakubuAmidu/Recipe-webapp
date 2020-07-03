
export const deleteItem = id => {
const item = document.querySelector(`[data-itemid="${id}"]`);
if (item) item.parentElement.removeChild(item);
};
