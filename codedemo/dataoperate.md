# 数据展示示例

本示例介绍在JS编码过程中，界面展示和数据操作分离。

点击[示例链接](cartdemo.html)查看显示效果及具体代码。

以上购物车列表示例中的JS代码，包含4个类

Cart 购物车

主要属性
* data 列表数据
* con  dom容器
* products 对应产品列表
* cList    所包含购物车项(CartItem)列表
* totalPrice 总价

主要方法
* getTotalPrice 计算总价
* addCartItm 增加项目
* removeCartItm 删除项目

CartItem 购物车项

主要属性
* data 对应数据
* con  dom容器
* parent 父级购物车

主要方法
* addItem 增加
* lessItem 减少
* removeItem 删除
* getData 返回所属数据

Products 产品列表

主要属性
* cart 对应购物车
* data 列表数据
* pList 产品项列表

主要方法
* getPrice 获取产品价格
* getProName 获取产品名称
* getProType 获取产品型号

ProItem 产品项

主要属性
* parent 父级产品列表
