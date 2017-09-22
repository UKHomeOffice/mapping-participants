'use strict';

module.exports = {
  pageRemaining: (data) => {
    const pageVal = data.meta.pagination.pageSize / data.meta.pagination.total;

    if (pageVal < 1) {
      return 0;
    } else if (pageVal % 1 !== 0) {
      return pageVal + 1;
    }
    return pageVal;
  }
};
