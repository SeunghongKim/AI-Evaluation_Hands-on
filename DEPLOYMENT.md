# 🚀 GitHub Pages 배포 가이드

본 프로젝트를 GitHub Pages로 배포하는 방법입니다.

## 1. GitHub 저장소 생성

```bash
# GitHub에서 새 저장소 생성 (예: ai-evaluation-lab)
# 로컬에서 초기화
cd ai-evaluation-lab
git init
git add .
git commit -m "Initial commit: AI Evaluation Lab"
git branch -M main
git remote add origin https://github.com/your-username/ai-evaluation-lab.git
git push -u origin main
```

## 2. GitHub Pages 활성화

1. GitHub 저장소 → **Settings** 탭
2. 왼쪽 메뉴에서 **Pages** 선택
3. **Source** 섹션에서:
   - Branch: `main` 선택
   - Folder: `/ (root)` 선택
4. **Save** 클릭

## 3. URL 확인

배포가 완료되면 다음 URL에서 접근 가능합니다:

```
https://your-username.github.io/ai-evaluation-lab/
```

## 4. 커스텀 도메인 (선택사항)

### 4.1 도메인 설정

1. GitHub Pages 설정에서 **Custom domain** 입력
2. DNS 제공자에서 CNAME 레코드 추가:
   ```
   CNAME  @  your-username.github.io
   ```

### 4.2 HTTPS 강제

- **Enforce HTTPS** 체크박스 활성화

## 5. Jupyter Notebook 렌더링

GitHub Pages는 기본적으로 `.ipynb` 파일을 렌더링하지 않습니다. 다음 옵션을 사용하세요:

### 옵션 1: nbviewer 링크 (권장)

`README.md`와 `index.html`에서 노트북 링크를 nbviewer로 변경:

```html
<a href="https://nbviewer.org/github/your-username/ai-evaluation-lab/blob/main/notebooks/1_ml_data_sample_bias.ipynb">
  노트북 보기
</a>
```

### 옵션 2: HTML로 변환

```bash
# 모든 노트북을 HTML로 변환
jupyter nbconvert --to html notebooks/*.ipynb --output-dir docs/

# docs/ 폴더를 GitHub Pages source로 설정
```

### 옵션 3: Binder 연동

README.md에 Binder 배지 추가:

```markdown
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/your-username/ai-evaluation-lab/main?filepath=notebooks)
```

## 6. 자동 배포 (GitHub Actions)

`.github/workflows/deploy.yml` 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'

      - name: Install dependencies
        run: |
          pip install jupyter nbconvert

      - name: Convert notebooks to HTML
        run: |
          mkdir -p docs/notebooks
          jupyter nbconvert --to html notebooks/*.ipynb --output-dir docs/notebooks/

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
```

## 7. 업데이트 배포

```bash
# 변경사항 커밋 및 푸시
git add .
git commit -m "Update notebooks"
git push origin main

# GitHub Pages가 자동으로 재배포됩니다 (1-2분 소요)
```

## 8. 문제 해결

### 404 오류

- `index.html`이 루트에 있는지 확인
- GitHub Pages 설정에서 올바른 브랜치와 폴더 선택 확인

### 스타일 깨짐

- `_config.yml`에서 `baseurl` 확인:
  ```yaml
  baseurl: "/ai-evaluation-lab"  # 저장소 이름
  ```

### Notebook이 표시되지 않음

- nbviewer 또는 Binder 링크 사용
- 또는 HTML로 변환 후 배포

## 9. 추가 리소스

- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [Jekyll 테마](https://github.com/pages-themes)
- [nbviewer](https://nbviewer.org/)
- [Binder](https://mybinder.org/)

---

## 빠른 배포 체크리스트

- [ ] GitHub 저장소 생성 및 코드 푸시
- [ ] GitHub Pages 활성화 (Settings → Pages)
- [ ] `index.html` 링크를 nbviewer로 업데이트
- [ ] README.md에 배포 URL 추가
- [ ] 배포 확인 (https://your-username.github.io/ai-evaluation-lab/)

축하합니다! 🎉 AI 평가·검증 실습 Lab이 성공적으로 배포되었습니다.
