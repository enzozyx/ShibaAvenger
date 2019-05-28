package com.enzo.sa.db.service.impl;

import com.enzo.sa.common.bo.PageData;
import com.enzo.sa.db.dao.IDatabaseDao;
import com.enzo.sa.db.pojo.dto.Database;
import com.enzo.sa.db.service.IDatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DatabaseService implements IDatabaseService{

    @Autowired
    private IDatabaseDao dao;

    @Override
    public Database createDatabase(Database database) {
        if(database != null){
            this.dao.insert(database);
        }
        return queryDetail(database.getId());
    }



    @Override
    public Database queryDetail(Integer id) {
        if(id != null){
            return this.dao.selectDetail(id);
        }
        return null;
    }

    @Override
    public Database updateDatabase(Database db) {
        if(db != null && db.getId() != null){
            this.dao.updateByID(db);
        }
        return queryDetail(db.getId());
    }

    @Override
    public Database deleteDatabase(Integer id) {
        Database db = queryDetail(id);;
        if(db != null){
            this.dao.delete(id);
        }
        return db;
    }

    @Override
    public PageData<Database> queryPage(String name, String ip, Integer port, Short category, String location, Integer index, Integer size) {
        
        return null;
    }

    @Override
    public List<Database> queryAll(String name, String ip, Integer port, Short category, String location) {
        return this.queryAll(name, ip, port, category, location);
    }
}
