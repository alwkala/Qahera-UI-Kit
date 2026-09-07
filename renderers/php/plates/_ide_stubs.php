<?php

/**
 * Qahera UI Kit — IDE Helper Stubs for League/Plates
 *
 * This file provides type hints for IDEs and static analyzers (Intelephense, PHPStan)
 * when developing without vendor packages installed.
 * It is never executed in production.
 */

namespace League\Plates\Template;

if (!class_exists(Template::class, false)) {
    /**
     * League\Plates Template IDE Stub
     */
    class Template
    {
        /**
         * Escape a string for HTML output.
         *
         * @param string $string
         * @param string|null $functions
         * @return string
         */
        public function e(string $string, ?string $functions = null): string
        {
            return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
        }

        /**
         * Insert/render another template partial.
         *
         * @param string $name
         * @param array $data
         * @return string|void
         */
        public function insert(string $name, array $data = [])
        {
        }
    }
}
