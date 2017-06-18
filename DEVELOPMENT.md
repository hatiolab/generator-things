## 여기서는 generator-things를 업데이트하는 방법을 정리한다.

### generator를 수정한 후에 commit 한다.

### package 버전을 올려서 설정한다.
```$ npm version x.y.z```

### github에 push한다.

### github에 태깅한다.
```$ git push --tags```

### npm registry에 설정한다.
```$ npm publish```