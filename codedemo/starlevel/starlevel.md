星级
======

如下图所示，从0星到5星一共有8个不同的等级。为了符合规范的同时又能满足不同需求，提供了两种不同分辨率的星级样式**16x16** `big-star`和**12x12** `star`。H5页面常用的是12x12像素(支持Retina)。

![不同大小的星级图示](remark-example.jpg)

***
>右键另存为下载所需[图片](remark.png)和[less文件](star.less)


###0星

	class="star star-0"

###1星

	class="star star-10"

###2星

	class="star star-20"

###3星

	class="star star-30"

###3星半

	class="star star-35"

###4星

	class="star star-40"

###4星半

	class="star star-45"

###5星

	class="star star-50"


而对于较高分辨率的星级图片则直接把类名`star`替换成`big-star`。