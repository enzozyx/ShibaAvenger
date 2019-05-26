package com.enzo.sa.db.service.impl;

import com.enzo.sa.db.dao.IDatabaseDao;
import com.enzo.sa.db.pojo.dto.Database;
import com.enzo.sa.db.service.IDatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
