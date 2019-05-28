package com.enzo.sa.db.dao;

import com.enzo.sa.db.pojo.dto.SchemaDTO;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.jdbc.SQL;

import java.util.Date;
import java.util.List;

@Mapper
public interface ISchemaDao {

    @Insert("INSERT INTO shiba.t_schema(id, name, alias, db_id, lasted) " +
            "values(#{id}, #{name}, #{alias}, #{db_id}, now())")
    @SelectKey(statement = "select nextval('shiba.sa_sequence_of_schema_id')", keyColumn = "id", keyProperty = "id", before = true, resultType = java.lang.Integer.class)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    Integer insert(SchemaDTO schema);

    @UpdateProvider(type = UpdateProvider.class, method = "updatePropById")
    Integer update(SchemaDTO schema);

    @Delete("DELETE FROM shiba.t_schema WHERE id = #{id}")
    Integer delete(@Param("id")Integer id);

    @Select("SELECT id, name, alias, lasted, db_id as dbId FROM shiba.t_schema WHERE id = #{id}")
    SchemaDTO queryDetail(@Param("id") Integer id);

    @SelectProvider(type = SelectProviderBuilder.class, method = "queryAll")
    List<SchemaDTO> queryList(@Param("name") String name,@Param("dbId") Integer dbId,@Param("lasted") Date lasted);

    class UpdateBuilder {
        public String updatePropById(final SchemaDTO data) throws Exception {
            if(data != null && data.getId() != null){
                SQL sql = new SQL().UPDATE("shiba.t_schema").SET("lasted=now()");
                if(data.getName() != null)
                    sql.SET("name = #{name}");
                if(data.getAlias() != null)
                    sql.SET("alias = #{alias}");
                if(data.getDbId() != null)
                    sql.SET("db_id = #{dbId}");
                sql.WHERE("id = #{id}");
                return sql.toString();
            }
            throw new Exception("wrong parameter");
        }
    }

    class SelectProviderBuilder {

        public String queryAll(final String name, final Integer dbId, final Date lasted){
            SQL sql = new SQL().FROM("shiba.t_schema")
                    .SELECT("id", "name", "alias", "db_id", "lasted")
                    .ORDER_BY("lasted desc");
            if(name != null)
                sql.AND().WHERE("name like \'%${name}%\' or alias like \'%${name}%\'");
            if(dbId != null)
                sql.AND().WHERE("db_id = #{dbId}");
            if(lasted != null)
                sql.AND().WHERE("lasted >= #{lasted}");
            return sql.toString();
        }
    }
}
