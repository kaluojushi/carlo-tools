# MathType 使用指南

## 1 下载方法

在 [官网](https://www.mathtype.cn/xiazai.html) 下载试用版即可。

## 2 激活方法

1. 点击按钮，下载文件：

   <download-mathtype-activator></download-mathtype-activator>

   如果你无法下载文件，请新建一个 txt 文件 `Mathtype 7.txt`，然后复制下面的内容并粘贴到文件里，保存，将文件后缀名改为 `reg`。

   ```reg
   Windows Registry Editor Version 5.00
   
   [-HKEY_CURRENT_USER\Software\JavaSoft\Prefs\com\wiris\editor\license\]
   [HKEY_CURRENT_USER\Software\JavaSoft\Prefs\com\wiris\editor\license\]
   "/Cv/E/C81+j/Rw/U/E6ws/Znt/Os/K/Q=="="11/M/P/Ir/Y/B/S/P/Pr/Q/L/Ny/T9s4/Iw=="
   "/Mz/Bhef/D/Q/Hs30/U6/F/Pdl/R/Xsg=="="/S/Zd8c/Ai/Z/A83028s6/Kn/Gf/M/Q=="
   "vi/L/M7/K/Hb/C/O/A/K/X9uuis/O1/J/A=="="/S/Zd8c/Ai/Z/A80\\/O/S/C/Vgp\\0/P/Q=="
   "wm/U/C/Y/T/Nz5/Tw="="/Wna/F/W3q/I/Yp/V\\lj/Dedai56/Ur/Wpf/P/Kpl/Soh/A/Z/Qe\\6hit3ym\\6m5sp/B/B/Q=="
   "x/W/Yrj/M/Db/Bds="="104z/W8rbqpw5\\/Qz0/C/Q/Opu/Dj/B5b/Dwsy77"
   ```

2. 双击 `reg` 文件，点击是、确定。
3. 打开 Word 中的 MathType，试用版剩余天数会变成近 3 万天，点击“继续使用试用版”使用。

## 3 使用技巧

### 3.1 使用 LaTeX 语法

1. 打开 MathType，点击菜单栏中的【预置】。
2. 选择“工作区预置”。
3. 勾选下方的“允许从键盘输入 Tex 语言”。
4. 点击“确定”。

参考：[如何在MathType中用LaTex代码编辑公式 - 简书](https://www.jianshu.com/p/5c4f95934da3)

### 3.2 MathType 快捷键

**输入类**

1. 分式
   - <kbd>Ctrl</kbd> + <kbd>F</kbd>：分式
   - <kbd>Ctrl</kbd> + <kbd>/</kbd>：斜杠分式

2. 根式
   - <kbd>Ctrl</kbd> + <kbd>R</kbd>：根式 √
   - <kbd>Ctrl</kbd> + <kbd>T</kbd>，再按 <kbd>N</kbd>：n 次根式

3. 上下标
   - <kbd>Ctrl</kbd> + <kbd>H</kbd>：上标
   - <kbd>Ctrl</kbd> + <kbd>L</kbd>：下标
   - <kbd>Ctrl</kbd> + <kbd>J</kbd>：上下标

4. 括号
   - <kbd>Ctrl</kbd> + <kbd>9</kbd> 或 <kbd>Ctrl</kbd> + <kbd>0</kbd>：矩阵小括号对 ()
   - <kbd>Ctrl</kbd> + <kbd>[</kbd> 或 <kbd>Ctrl</kbd> + <kbd>]</kbd>：矩阵中括号对 []
   - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>[</kbd> 或 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>]</kbd>：矩阵大括号对 {}

5. 导数与积分
   - <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>'</kbd>：单撇（一阶导数） '，可以重复
   - <kbd>Ctrl</kbd> + <kbd>I</kbd>：积分号 ∫
   - <kbd>Ctrl</kbd> + <kbd>K</kbd>，再按 <kbd>D</kbd>：偏导符号 ∂

6. 关系
   - <kbd>Ctrl</kbd> + <kbd>K</kbd>，再按 <kbd>,</kbd>：小于等于 ≤
   - <kbd>Ctrl</kbd> + <kbd>K</kbd>，再按 <kbd>.</kbd>：大于等于 ≥
   - <kbd>Ctrl</kbd> + <kbd>K</kbd>，再按 <kbd>=</kbd>：恒等于 ≡
   - <kbd>Ctrl</kbd> + <kbd>K</kbd>，再按 <kbd>Shift</kbd> + <kbd>=</kbd>：不等于 ≠
   - <kbd>Ctrl</kbd> + <kbd>K</kbd>，再按 <kbd>Shift</kbd> + <kbd>`</kbd>：约等于 ≈
   - <kbd>Ctrl</kbd> + <kbd>K</kbd>，再按 <kbd>P</kbd>：成正比 ∝

7. 标记
   - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>-</kbd>：上横线

8. 求和与连乘
   - <kbd>Ctrl</kbd> + <kbd>T</kbd>，再按 <kbd>S</kbd>：求和 ∑
   - <kbd>Ctrl</kbd> + <kbd>T</kbd>，再按 <kbd>P</kbd>：连乘 ∏

9. 希腊字母
   - <kbd>Ctrl</kbd> + <kbd>G</kbd>，再按小写或大写字母

   - 下表依次为键盘对应的拉丁字母、大写状态输入的希腊字母、小写状态输入的希腊字母

     |   1   |   2   |   3   |   4   |   5   |   6   |   7   |   8   |   9   |   0   |
     | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
     | Q Θ θ | W Ω ω | E Ε ε | R Ρ ρ | T Τ τ | Y Ψ ψ | U Υ υ | I Ι ι | O Ο ο | P Π π |
     | A Α α | S Σ σ | D Δ δ | F Φ φ | G Γ γ | H Η η | J ϑ ϕ | K Κ κ | L Λ λ |   ;   |
     | Z Ζ ζ | X Ξ ξ | C Χ χ | V ς ϖ | B Β β | N Ν ν | M Μ μ |   ,   |   .   |   /   |

10. 空格

   - <kbd>Shift</kbd> + <kbd>Space</kbd>：零宽度空格
   - <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Space</kbd>：一点空格
   - <kbd>Ctrl</kbd> + <kbd>Space</kbd>：小空格
   - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Space</kbd>：大空格
   - <kbd>Ctrl</kbd> + <kbd>K</kbd>，再按 <kbd>4</kbd>：全角空格

**功能类**

1. 改变缩放
   - <kbd>Ctrl</kbd> + <kbd>1</kbd>：100%
   - <kbd>Ctrl</kbd> + <kbd>2</kbd>：200%
   - <kbd>Ctrl</kbd> + <kbd>4</kbd>：400%
   - <kbd>Ctrl</kbd> + <kbd>8</kbd>：800%
2. 移动公式
   - <kbd>Shift</kbd> + 方向键：选择公式
   - <kbd>Ctrl</kbd> + 方向键：移动公式
3. 元素间跳转
   - <kbd>Tab</kbd>：跳转到下一个输入位置
   - <kbd>Enter</kbd>：换行
4. 加粗
   - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>：加粗（需先选中）
5. 菜单栏与工具条
   - <kbd>Alt</kbd> 或 <kbd>F10</kbd>：进入菜单栏
   - <kbd>F2</kbd>、<kbd>F6</kbd>、<kbd>F7</kbd>、<kbd>F8</kbd>、<kbd>F9</kbd>：进入工具条第 1、2、3、4、5 行

参考：[MathType快捷键大全 - MathType中文网](https://www.mathtype.cn/jiqiao/changyong-kuaijiejian.html)
