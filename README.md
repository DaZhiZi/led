# 一个 LED 点阵模拟器
js 实现的 LED 点阵模拟器

## 屏幕截图
![led gif](led.gif)

## 功能列表
1. 32x16 点阵滚动显示 ascii 字符和 gbk 汉字，其他语言暂不支持（没字模）
2. 面板可以调整滚动速度、颜色和输入文本
3. 浏览器本地保存配置

## 思路
- html
     - container
        - display 显示框
        - control 控制
            - scroll_speed
            - select_color
            - update button
            - textarea
        - footer
            - author

- js
    - initial 配置
        - load_config_options
            - scroll_speed
            - color
            - textarea 默认文本
    - events
        - change_string
            - update_string
            - save_local_option 保存当前的状态
        - change_color
            - change_css
            - save_local_option 保存当前的状态
        - speed
            - change_speed
            - save_local_option 保存当前的状态

    - show
        - instance led

        - show 显示框

    - led
        - canvas
        - context
        - fps
        - h
        - w
        - pixel_radius
        - pixel_space
        - pixels
        - color
        - cool_down_speed
        - cool_down
        - scroll_string
        - scroll_string_bits
        - scroll_offset

        - pixel_color(x, y)
        - update()
            - update_color()
            - update_scroll_string()
            - update_scroll_speed()
        - clear()
        - draw()
            - pixel

        - on
            - interval
                - setTimeout
        - font
            - string_bits
                - string_bit
                    - word_bits`
                          - Ascii
                          - GBK
