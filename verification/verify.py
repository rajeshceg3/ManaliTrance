
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile Context
        mobile_context = browser.new_context(
            viewport={'width': 375, 'height': 667},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
        )
        mobile_page = mobile_context.new_page()

        # Desktop Context
        desktop_context = browser.new_context(
            viewport={'width': 1280, 'height': 800}
        )
        desktop_page = desktop_context.new_page()

        # Load file
        path = os.path.abspath('index.html')
        url = f'file://{path}'

        print(f"Loading {url}")

        # Test Desktop
        desktop_page.goto(url)
        desktop_page.wait_for_selector('#map')
        desktop_page.wait_for_timeout(2000) # Wait for map tiles
        desktop_page.screenshot(path='verification/desktop_initial.png')

        # Click start button
        desktop_page.click('#start-btn')
        desktop_page.wait_for_timeout(2000) # Wait for flyTo and transition
        desktop_page.screenshot(path='verification/desktop_story.png')

        # Test Mobile
        mobile_page.goto(url)
        mobile_page.wait_for_selector('#map')
        mobile_page.wait_for_timeout(2000)
        mobile_page.screenshot(path='verification/mobile_initial.png')

        # Click start
        mobile_page.click('#start-btn')
        mobile_page.wait_for_timeout(2000)
        mobile_page.screenshot(path='verification/mobile_story.png')

        browser.close()

if __name__ == '__main__':
    run()
