package com.enzo.sa.db.service;

import com.enzo.sa.common.bo.PageData;
import com.enzo.sa.db.pojo.dto.Database;

import java.util.List;

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
    /**
    * @author enzo
    * @date 2019/5/28 10:38 PM
    * @todo 修改数据库信息
    * @param
    * @throws
    * @return
    * @remark
    */
    Database updateDatabase(Database db);
    /**
    * @author enzo
    * @date 2019/5/28 10:39 PM
    * @todo 删除数据库
    * @param
    * @throws
    * @return
    * @remark
    */
    Database deleteDatabase(Integer id);


    /**
    * @author enzo
    * @date 2019/5/28 10:46 PM
    * @todo 分页查询
    * @param
    * @throws
    * @return
    * @remark
    */
    PageData<Database> queryPage(String name, String ip, Integer port, Short category, String location, Integer index, Integer size);

    /**
    * @author enzo
    * @date 2019/5/28 10:46 PM
    * @todo 查询所有
    * @param
    * @throws
    * @return
    * @remark
    */
    List<Database> queryAll(String name, String ip, Integer port, Short category, String location);
}
