package com.enzo.sa.db.rest;

import com.enzo.sa.db.apis.IDatabaseApis;
import com.enzo.sa.db.pojo.dto.Database;
import com.enzo.sa.db.service.IDatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DatabaseRestController implements IDatabaseApis{

    @Autowired
    private IDatabaseService service;

    @Override
    public Database queryDetail(Integer id) {
        return this.service.queryDetail(id);
    }

    @Override
    public Database createDatabase(Database database) {
        return this.service.createDatabase(database);
    }
}
