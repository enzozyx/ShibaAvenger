package com.enzo.sa.common.bo;

public class PageMeta {

    private Integer index;

    private Integer size;

    private Integer count;

    private Integer total;

    public PageMeta() {
    }

    public PageMeta(Integer index, Integer size, Integer total) {
        this.index = index;
        this.size = size;
        this.total = total;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Integer getCount() {
        if(count == null && size != null && total != null){
            count = (total/size) + (total%size > 0 ? 1: 0);
        }
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }
}
