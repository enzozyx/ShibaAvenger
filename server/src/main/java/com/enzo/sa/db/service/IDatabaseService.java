package com.enzo.sa.db.service;

import com.enzo.sa.db.pojo.dto.Database;

public interface IDatabaseService {

    /**
    * @author enzo
    * @date 2019/5/15 9:45 PM
    * @todo 创建一个数据库
    * @param
    * @throws
    * @return
    * @remark
    */
    Database createDatabase(Database database);
    /**
    * @author enzo
    * @date 2019/5/15 9:45 PM
    * @todo 查询数据详情
    * @param
    * @throws
    * @return
    * @remark
    */
    Database queryDetail(Integer id);
}
