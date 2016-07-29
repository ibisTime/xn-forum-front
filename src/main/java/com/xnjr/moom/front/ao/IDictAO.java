package com.xnjr.moom.front.ao;

import java.util.List;

import com.xnjr.moom.front.res.XNlh5014Res;

public interface IDictAO {
    public List<XNlh5014Res> queryDictList(String type);

    public List queryBanks(String status, String orderColumn, String orderDir);

    public Object queryDictList(String type, String parentKey, String dkey,
            String orderColumn, String orderDir);
}
