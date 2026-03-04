#!/usr/bin/env python3
"""
GitHub Pages 배포를 위한 링크 업데이트 스크립트
사용법: python update_links.py YOUR_GITHUB_USERNAME
"""

import sys
import re
from pathlib import Path


def update_links(username: str):
    """index.html과 README.md의 링크를 nbviewer 링크로 변경"""

    # 파일 경로
    index_html = Path("index.html")
    readme_md = Path("README.md")

    # GitHub 링크를 nbviewer 링크로 변경하는 함수
    def to_nbviewer(match):
        notebook_path = match.group(1)
        return f'href="https://nbviewer.org/github/{username}/ai-evaluation-lab/blob/main/{notebook_path}"'

    # index.html 업데이트
    if index_html.exists():
        content = index_html.read_text(encoding='utf-8')

        # your-repo를 실제 사용자명으로 변경
        content = content.replace('your-repo', username)

        # GitHub 링크를 nbviewer로 변경
        pattern = r'href="https://github\.com/[^/]+/ai-evaluation-lab/blob/main/(notebooks/[^"]+\.ipynb)"'
        content = re.sub(pattern, to_nbviewer, content)

        index_html.write_text(content, encoding='utf-8')
        print(f"✅ {index_html} 업데이트 완료")

    # README.md 업데이트
    if readme_md.exists():
        content = readme_md.read_text(encoding='utf-8')

        # your-repo를 실제 사용자명으로 변경
        content = content.replace('your-repo', username)
        content = content.replace('your-username', username)

        # 노트북 링크를 nbviewer로 변경
        pattern = r'\[`([^`]+\.ipynb)`\]\(notebooks/([^)]+\.ipynb)\)'
        replacement = rf'[`\1`](https://nbviewer.org/github/{username}/ai-evaluation-lab/blob/main/notebooks/\2)'
        content = re.sub(pattern, replacement, content)

        readme_md.write_text(content, encoding='utf-8')
        print(f"✅ {readme_md} 업데이트 완료")

    print(f"\n🎉 링크 업데이트 완료!")
    print(f"📝 다음 명령어로 변경사항을 커밋하세요:")
    print(f"   git add .")
    print(f"   git commit -m 'chore: Update links for GitHub Pages'")
    print(f"   git push origin main")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("사용법: python update_links.py YOUR_GITHUB_USERNAME")
        print("예시: python update_links.py octocat")
        sys.exit(1)

    username = sys.argv[1]
    update_links(username)
