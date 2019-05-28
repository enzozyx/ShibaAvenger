package com.enzo.sa.db.pojo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class SchemaDTO {

    private Integer id;

    @JsonProperty("db_id")
    private Integer dbId;

    private String name;

    private String alias;

    private Date lasted;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDbId() {
        return dbId;
    }

    public void setDbId(Integer dbId) {
        this.dbId = dbId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public Date getLasted() {
        return lasted;
    }

    public void setLasted(Date lasted) {
        this.lasted = lasted;
    }
}
