<?php

/**
 * @OA\Info(
 *   title="API",
 *   description="Share Recipes API",
 *   version="1.0",
 *   @OA\Contact(
 *     email="benjamin.dlakic@stu.ibu.edu.ba",
 *     name="Benjamin Dlakic"
 *   )
 * ),
 * @OA\OpenApi(
 *   @OA\Server(
 *       url=BASE_URL
 *   )
 * )
 * @OA\SecurityScheme(
 *     securityScheme="ApiKey",
 *     type="apiKey",
 *     in="header",
 *     name="Authentication"
 * )
 */
