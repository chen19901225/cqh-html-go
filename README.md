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

