# cqh-html-go README


##　功能

* `alt + e`, 列出当前文件所有的html


## 原理

通过正则匹配的group(1), 获取html


##  例子


### ansible ymal

```
{
        "name": ".yaml",
        "start_text_list": [
            "^- include_tasks: (.+)"
        ]
}
```


### 匹配 `ansible_cmd = f"ansible-playbook {proj_dir}/**.yaml -e ***"`


```
{
        "name": ".yaml",
        "start_text_list": [
            "^ansible_cmd = f\"ansible-playbook \\{proj_dir\\}/(\\S+).+\""
            "^ansible_cmd = f'ansible-playbook \\{proj_dir\\}/(\\S+).+'"
        ]
}

```

### 匹配 `{% extends '***.html' %}`


```
{
            "name": ".html",
            "start_text_list": [
                "\\{%\\s*extends\\s*'(.+)'\\s*%\\}",
                "\\{%\\s*extends\\s*\"(.+)\"\\s*%\\}",
            ]
}
```

### 匹配 html `{{reverse_url("xxx")}}`


```
  {
            "name": ".html",
            "start_text_list": [
                "\\{\\{reverse_url\\(\"(.+)\"\\)\\}\\}",
            ]
}
```

### 匹配 py `self._app.reverse_url("xxx")`


```
{
    "name": ".py",
    "start_text_list": [
           "reverse_url\\(\"(.*)\"\\)",
            "reverse_url\\('(.*)'\\)",
    ]
}
```

### extra 998 from `[998.xxxx](urllink)`


```
 {
            "name": ".md",
            "start_text_list": [
                "\\[(\\d+)\\..+\\]",
            ]
        },
```