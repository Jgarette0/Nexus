const awakeToast = (type, message, toastId, toast) => {
  switch (type) {
    case "error":
      toast.error(message, {
        toastId: toastId,
      });
      break;

    case "success":
      toast.success(message, {
        toastId: toastId,
      });
      break;

    default:
      break;
  }
};

const notifyAndUpdate = (toastId, type, message, toast) => {
  if (toast.isActive(toastId)) {
    toast.update(toastId);
  } else {
    awakeToast(type, message, toastId, toast);
  }
};

module.exports = {
  notifyAndUpdate,
};