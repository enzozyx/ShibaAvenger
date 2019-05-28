package com.enzo.sa.db.dao;

import com.enzo.sa.db.pojo.dto.Database;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.jdbc.SQL;

import java.util.List;

@Mapper
public interface IDatabaseDao {

    /**
    * @author enzo
    * @date 2019/5/15 9:44 PM
    * @todo 创建一个数据库
    * @param
    * @throws
    * @return
    * @remark
    */
    @Insert("insert into shiba.t_database(id, name, alias, server_ip, server_port, category, location, lasted) " +
            "values(#{id}, #{name}, #{alias}, #{serverIp}, #{serverPort}, #{category}, #{location}, now() )")
    @SelectKey(statement = "select  nextval('shiba.sa_sequence_of_database_id') as id", keyProperty = "id", keyColumn = "id", before = true, resultType = java.lang.Integer.class)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Database database);
    /**
    * @author enzo
    * @date 2019/5/15 9:44 PM
    * @todo 查询详情
    * @param
    * @throws
    * @return
    * @remark
    */
    @Select("select id, name, alias, server_ip, server_port, category, location, lasted from shiba.t_database where id = #{id}")
    Database selectDetail(@Param("id") Integer id);

    @Delete("DELETE FROM shiba.t_database WHERE id = #{id}")
    Integer delete(@Param("id") Integer id);

    @UpdateProvider(type = UpdateBuilder.class, method = "updatePropById")
    int updateByID(Database data);

    class UpdateBuilder {
        public String updatePropById(final Database data) throws Exception {
            if(data != null && data.getId() != null){
                SQL sql = new SQL().UPDATE("shiba.t_database").SET("lasted=now()");
                if(data.getName() != null)
                    sql.SET("name = #{name}");
                if(data.getAlias() != null)
                    sql.SET("alias = #{alias}");
                if(data.getCategory() != null)
                    sql.SET("category = #{category}");
                if(data.getServerIp() != null)
                    sql.SET("server_ip = #{serverIp}");
                if(data.getServerPort() != null)
                    sql.SET("server_port = #{serverPort}");
                if(data.getLocation() != null)
                    sql.SET("location = #{location}");
                sql.WHERE("id = #{id}");
                return sql.toString();
            }
            throw new Exception("wrong parameter");
        }
    }

    @SelectProvider(type = SelectProviderBuilder.class, method = "queryAll")
    List<Database> findAll(@Param("name") String name, @Param("category") Short category, @Param("ip") String ip);

    class SelectProviderBuilder {

        public String queryAll(final String name, final Short category, final String ip){
            SQL sql = new SQL().FROM("shiba.t_database")
                    .SELECT("id", "name", "alias", "server_ip", "server_port", "category", "location", "lasted")
                    .ORDER_BY("lasted desc");
            if(name != null)
                sql.AND().WHERE("name like \'%${name}%\' or alias like \'%${name}%\'");
            if(category != null)
                sql.AND().WHERE("category = #{category}");
            if(ip != null)
                sql.AND().WHERE("ip = #{ip}");
            return sql.toString();
        }
    }
}
