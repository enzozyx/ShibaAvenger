package com.enzo.sa.common.bo;

import java.util.List;

public class PageData<T> {

    private List<T> list;

    private PageMeta page;

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public PageMeta getPage() {
        return page;
    }

    public void setPage(PageMeta page) {
        this.page = page;
    }


    public PageData(List<T> list, Integer index, Integer size, Integer total) {
        this.list = list;
        this.page = new PageMeta(index, size, total);
    }
}
