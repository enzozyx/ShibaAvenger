package com.enzo.sa.db.pojo.dto;

import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.ResultType;

import java.util.Date;

public class Database {
//    d, name, alias, server_ip, server_port, category, location, lasted

    private Integer id;

    private String name;

    private String alias;

    private String serverIp;

    private Integer serverPort;

    private Short category;

    private String location;

    private Date lasted;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getServerIp() {
        return serverIp;
    }

    public void setServerIp(String serverIp) {
        this.serverIp = serverIp;
    }

    public Integer getServerPort() {
        return serverPort;
    }

    public void setServerPort(Integer serverPort) {
        this.serverPort = serverPort;
    }

    public Short getCategory() {
        return category;
    }

    public void setCategory(Short category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getLasted() {
        return lasted;
    }

    public void setLasted(Date lasted) {
        this.lasted = lasted;
    }
}
