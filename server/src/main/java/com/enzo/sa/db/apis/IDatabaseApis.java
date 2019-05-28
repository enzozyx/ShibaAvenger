package com.enzo.sa.db.apis;

import com.enzo.sa.db.pojo.dto.Database;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Api(tags = {"database"}, value = "api of database management")
public interface IDatabaseApis {

    /**
    * @author enzo
    * @date 2019/5/15 9:52 PM
    * @todo 查询数据库详情
    * @param
    * @throws
    * @return
    * @remark
    */
    @GetMapping("/sa/db/query")
    @ApiOperation(value = "查询数据库详情", notes = "查询数据库详情\n" +
            "1. 请求方式：\n" +
            "  GET\n" +
            "2. 请求参数说明\n" +
            "  id 数据库ID\n")
    Database queryDetail(@RequestParam("id") Integer id);
    /**
    * @author enzo
    * @date 2019/5/19 12:01 PM
    * @todo 创建数据库
    * @param
    * @throws
    * @return
    * @remark
    */
    @PostMapping("/sa/db/add")
    @ApiOperation(value = "创建数据库", notes = "创建数据库\n" +
            "1. 请求方式：\n" +
            "  POST: application/json\n" +
            "2. 请求参数说明\n" +
            "  name 数据库名\n" +
            "  alias 数据别名\n" +
            "  category 数据库类型\n" +
            "  server_ip 数据库连接IP\n" +
            "  server_port 数据库监听端口\n" +
            "  location 数据库存储路径\n" )
    Database createDatabase(@RequestBody Database database);

    @PostMapping("/sa/db/update")
    @ApiOperation(value = "修改数据库属性", notes="修改数据库属性\n" +
            "1. 请求方式\n" +
            "  POST：application/json\n" +
            "2. 请求参数说明\n" +
            "  id 数据库ID\n" +
            "  name 数据库名\n" +
            "  alias 数据别名\n" +
            "  category 数据库类型\n" +
            "  server_ip 数据库连接IP\n" +
            "  server_port 数据库监听端口\n" +
            "  location 数据库存储路径\n" )
    Database updateDatabase(@RequestBody Database database);

    @DeleteMapping("/sa/db/delete")
    @ApiOperation(value = "删除数据库", notes = "删除数据库\n" +
            "1. 请求方式\n" +
            "  POST：application/json\n" +
            "2. 请求参数说明\n" +
            "  ID 数据库ID")
    Database deleteDatabse(@RequestParam Integer id);
}
